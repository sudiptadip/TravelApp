import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import React from "react";
import { Link, useLocation } from "react-router";
import { cn } from "~/lib/utils";

const Header = ({
  title,
  description,
  ctaUrl,
  ctaText,
}: {
  title: string;
  description: string;
  ctaText?: string;
  ctaUrl?: string;
}) => {
  const location = useLocation();

  return (
    <header className="header">
      <article>
        <h1
          className={cn(
            "text-dark-100",
            location.pathname === "/"
              ? "text-2xl, md:text-4xl font-bold"
              : "text-xl md:text-2xl font-semibold"
          )}
        >
          {title}
        </h1>
        <p
          className={cn(
            "text-gray-100",
            location.pathname === "/"
              ? "text-base, md:text-lg font-bold"
              : "text-sm md:text-lg"
          )}
        >
          {description}
        </p>
      </article>
      {ctaText && ctaUrl && (
        <Link to={ctaUrl}>
          <ButtonComponent
            type="button"
            className="button-class !h-11 !w-full md:w-[260px] !md:px-3"
          >
            <img
              src={"../public/assets/icons/plus.svg"}
              className="size-5"
              alt="plus"
            />
            <span className="p-16-semibold text-white">{ctaText}</span>
          </ButtonComponent>
        </Link>
      )}
    </header>
  );
};

export default Header;
