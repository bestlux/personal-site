import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { EmailReveal } from "@/components/email-reveal";

describe("EmailReveal", () => {
  it("reveals a mailto link on click", async () => {
    const user = userEvent.setup();

    render(<EmailReveal user="iomancer" host="lightweavelabs" tld="com" />);

    await user.click(screen.getByRole("button", { name: /reveal email/i }));

    const link = screen.getByRole("link", { name: /iomancer@lightweavelabs.com/i });
    expect(link).toHaveAttribute("href", "mailto:iomancer@lightweavelabs.com");
  });
});