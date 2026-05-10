import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact – SVRA Technology Solutions",
  description:
    "Get in touch with SVRA Technology Solutions. Submit an enquiry and our team will respond within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <ContactForm />
      <ContactInfo />
      <Footer />
    </>
  );
}
