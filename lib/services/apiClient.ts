import { RequestOptions } from "@/types/api";

const API_URL = "";

class ApiClient {
  private billingEnabled: boolean = true;

  public setBillingEnabled(enabled: boolean) {
    this.billingEnabled = enabled;
  }

  private async parseResponseBody<T>(response: Response): Promise<T> {
    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      return response.json() as Promise<T>;
    }

    const text = await response.text();

    return {
      message: text || response.statusText || "Request failed",
    } as T;
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {},
  ): Promise<T> {
    const url = `${API_URL}${endpoint}`;

    // Default headers
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "x-billing-enabled": String(this.billingEnabled),
      ...options.headers,
    };

    const config: RequestInit = {
      ...options,
      headers,
      credentials: "include", // Ensure cookies are sent
    };

    const response = await fetch(url, config);

    const data = await this.parseResponseBody<T & { message?: string; code?: string | null }>(response);

    if (!response.ok) {
      // Handle global errors (e.g. 401 Unauthorized)
      if (response.status === 401 && typeof window !== "undefined") {
        // Optional: Redirect to login or clear auth state
        // window.location.href = '/auth';
      }

      // Emit a global event for quota / upgrade-required errors so any mounted
      // UpgradePromptModal can intercept and show contextual messaging.
      if (response.status === 402 && typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("billing:limit-hit", {
            detail: data as Record<string, unknown>,
          })
        );
      }

      const err = new Error(data.message ?? "API request failed") as Error & { code?: string | null; status?: number };
      err.code = data.code ?? null;
      err.status = response.status;
      throw err;
    }

    return data;
  }

  get<T>(endpoint: string, headers?: Record<string, string>) {
    return this.request<T>(endpoint, { method: "GET", headers });
  }

  post<T>(endpoint: string, body: unknown, headers?: Record<string, string>) {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
      headers,
    });
  }

  put<T>(endpoint: string, body: unknown, headers?: Record<string, string>) {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
      headers,
    });
  }

  delete<T>(endpoint: string, headers?: Record<string, string>) {
    return this.request<T>(endpoint, { method: "DELETE", headers });
  }

  // File upload requires special handling (no Content-Type header, it's auto-set by browser)
  async upload<T>(endpoint: string, formData: FormData): Promise<T> {
    const url = `${API_URL}${endpoint}`;
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        "x-billing-enabled": String(this.billingEnabled),
      },
      credentials: "include",
    });

    const data = await this.parseResponseBody<T & { message?: string }>(response);
    if (!response.ok) throw new Error(data.message ?? "Upload failed");
    return data;
  }
}

export const apiClient = new ApiClient();
