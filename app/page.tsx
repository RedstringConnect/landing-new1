import React from "react";
import { ContactCard } from "@/components/maintenance/ContactCard";
import { Header } from "@/components/maintenance/Header";
import { Mockup } from "@/components/maintenance/Mockup";

export default function Home() {
  return (
    <div
      className="bg-[#0e0e10] flex flex-col items-center min-h-screen relative w-full overflow-x-hidden pt-24 xl:pt-0"
      data-name="1440px Desktop"
    >
      <Header />
      <div
        className="content-stretch flex flex-col xl:flex-row gap-[64px] items-start xl:items-center justify-center px-8 xl:px-[32px] relative w-full h-full xl:min-h-screen xl:max-w-[1280px] mx-auto isolate"
        data-name="Container"
      >
        <div
          className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] md:gap-[48px] items-start max-w-[560px] relative w-full z-[2]"
          data-name="Content"
        >
          <div
            className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full"
            data-name="Heading and Supporting Text"
          >
            <div
              className="content-stretch flex flex-col gap-[0] items-start relative shrink-0 w-full"
              data-name="Heading"
            >
              <p
                className="font-[540] font-denton leading-[1.1] xl:leading-[90px] relative shrink-0 text-white text-[48px] md:text-[56px] xl:text-[72px] tracking-[-1.44px] w-full"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                We&apos;re rebuilding something better!
              </p>
            </div>
            <p
              className="font-sans font-[400] leading-[28px] xl:leading-[30px] max-w-[480px] relative shrink-0 text-[18px] xl:text-[20px] w-full"
              style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
            >
              <span className="text-[#70707b]">We&apos;re crafting a better experience to help startups </span>
              <span className="text-[#a48afb]">hire faster</span>
              <span className="text-[#70707b]"> and talent </span>
              <span className="text-[#a48afb]">discover the right opportunities</span>
              <span className="text-[#70707b]">.</span>
            </p>
          </div>
          <div
            className="content-stretch flex flex-row gap-[16px] xl:gap-[24px] items-stretch xl:items-start relative shrink-0 w-full"
            data-name="Contact us"
          >
            <ContactCard
              title="Email"
              description="Our friendly team is here to help."
              value="founders@redstring.co.in"
              href="mailto:founders@redstring.co.in"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M14.6823 2.78681C12.7265 2.73773 11.2735 2.73774 9.3177 2.78681L9.24285 2.78869C7.73349 2.82652 6.49161 2.85765 5.49064 3.03175C4.42828 3.21654 3.53876 3.57641 2.78536 4.33174C2.0359 5.08311 1.67705 5.9586 1.49526 7.00416C1.32465 7.98538 1.29883 9.19623 1.26758 10.6617L1.26597 10.7371C1.24467 11.7351 1.24468 12.265 1.26599 13.2629L1.2676 13.3383C1.29884 14.8038 1.32466 16.0146 1.49527 16.9959C1.67707 18.0414 2.03592 18.9169 2.78537 19.6683C3.53878 20.4236 4.42829 20.7835 5.49066 20.9683C6.49162 21.1424 7.7335 21.1735 9.24286 21.2113L9.31772 21.2132C11.2735 21.2623 12.7265 21.2623 14.6823 21.2132L14.7571 21.2113C16.2665 21.1735 17.5084 21.1423 18.5094 20.9682C19.5717 20.7835 20.4612 20.4236 21.2146 19.6683C21.9641 18.9169 22.323 18.0414 22.5047 16.9958C22.6754 16.0146 22.7012 14.8038 22.7324 13.3383L22.734 13.2629C22.7553 12.2649 22.7553 11.7351 22.734 10.7371L22.7324 10.6618C22.7012 9.19627 22.6753 7.98538 22.5047 7.00416C22.3229 5.9586 21.9641 5.08311 21.2146 4.33174C20.7913 3.90728 20.3249 3.6077 19.809 3.39389C19.7305 3.35104 19.6464 3.31873 19.5587 3.29811C19.2289 3.18184 18.8796 3.09616 18.5093 3.03176C17.5084 2.85765 16.2665 2.82652 14.7571 2.78868L14.6823 2.78681ZM20.6798 8.8503C20.6604 8.44479 20.6507 8.24204 20.5039 8.16109C20.3571 8.08014 20.1765 8.18242 19.8155 8.38697L15.5798 10.787C14.2801 11.5234 13.181 12 11.9998 12C10.8186 12 9.71946 11.5234 8.41985 10.787L4.18445 8.38719C3.82343 8.18263 3.64292 8.08035 3.49608 8.1613C3.34924 8.24225 3.33957 8.44501 3.32023 8.85053C3.29416 9.39704 3.28003 10.0306 3.26403 10.7797C3.24333 11.7492 3.24334 12.2508 3.26405 13.2203C3.29736 14.7803 3.32261 15.8393 3.46432 16.6543C3.59776 17.4218 3.82038 17.8777 4.20122 18.2595C4.5781 18.6374 5.04027 18.8638 5.83355 19.0018C6.67174 19.1476 7.76497 19.1776 9.36791 19.2178C11.2902 19.266 12.7098 19.266 14.6321 19.2178C16.235 19.1776 17.3283 19.1476 18.1665 19.0018C18.9597 18.8638 19.4219 18.6374 19.7988 18.2595C20.1796 17.8777 20.4023 17.4218 20.5357 16.6543C20.6774 15.8393 20.7027 14.7803 20.736 13.2203C20.7567 12.2508 20.7567 11.7492 20.736 10.7797C20.72 10.0305 20.7058 9.39687 20.6798 8.8503Z" fill="#A48AFB"/>
</svg>
              }
            />
            <ContactCard
              title="Phone"
              description="Anytime from 8am to 7pm."
              value="+91 95025 75169"
              href="tel:+919502575169"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M18.7109 21.7329C20.4361 21.9231 21.75 20.4987 21.75 18.9099V17.4398C21.75 16.3423 20.8835 15.5626 19.9762 15.3976C19.4464 15.3012 18.8688 15.1401 18.3681 14.9805C17.306 14.6419 16.0857 14.8684 15.25 15.7041L12.9859 17.9673C10.028 16.4011 7.59769 13.9712 6.03173 11.0131L8.35391 8.69288C9.14265 7.90414 9.40319 6.7523 9.09274 5.71184C8.92896 5.16307 8.75033 4.52148 8.63383 3.98568C8.43869 3.08855 7.63733 2.25 6.56015 2.25H5.0901C3.50131 2.25 2.07691 3.56386 2.26711 5.28911C3.22015 13.9245 10.0755 20.7798 18.7109 21.7329Z" fill="#A48AFB"/>
</svg>
              }
            />
          </div>
        </div>
        <div className="flex-[1_0_0] w-full h-[300px] sm:h-[400px] xl:h-[598px] min-h-px min-w-px relative z-[1] mt-[-20px] sm:mt-[-40px] xl:mt-0" data-name="ContentRight">
          <div className="absolute left-1/2 -translate-x-1/2 xl:translate-x-0 xl:left-[-8px] xl:top-[-52.92px] w-[1040px]">
            <Mockup />
          </div>
        </div>
      </div>
    </div>
  );
}
