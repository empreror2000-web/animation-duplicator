import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Is WinoxTools free?",
    a: "Yes, 100%! All tools on WinoxTools are completely free to use. There are no hidden fees, premium tiers, or subscription plans. We believe essential productivity tools should be accessible to everyone.",
  },
  {
    q: "Do I need to sign up or create an account?",
    a: "No registration is required. You can use any tool immediately — no email, no password, no account needed. Just open the tool and start using it right away.",
  },
  {
    q: "Is my data safe?",
    a: "Absolutely. All tools run directly in your browser. Your files, text, and data are never uploaded to our servers. Everything is processed locally on your device, ensuring complete privacy and security.",
  },
  {
    q: "Do the tools work on mobile devices?",
    a: "Yes! WinoxTools is fully responsive and works great on smartphones, tablets, and desktop computers. The interface automatically adapts to your screen size for the best experience.",
  },
  {
    q: "Are my files uploaded to a server?",
    a: "No. All file processing happens in your browser using modern web technologies. Your files never leave your device. This means faster processing and complete privacy.",
  },
  {
    q: "How often do you add new tools?",
    a: "We regularly add new tools based on user feedback and emerging needs. Follow us on social media or check back often to discover the latest additions to our growing toolkit.",
  },
];

const FAQSection = () => {
  return (
    <section className="px-4 py-16 bg-background">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          Got questions? We've got answers.
        </p>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-card border border-border rounded-xl px-5 data-[state=open]:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left text-foreground font-semibold hover:no-underline py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
