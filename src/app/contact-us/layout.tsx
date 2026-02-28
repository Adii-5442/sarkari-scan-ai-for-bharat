import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | Sarkari Scan",
    description:
        "Get in touch with the Sarkari Scan team. We're here to help you with your government job search queries.",
    alternates: {
        canonical: "https://sarkariscan.com/contact-us",
    },
};

export default function ContactUsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
