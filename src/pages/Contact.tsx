import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
  message: z.string().trim().min(1, "Message is required").max(5000, "Message must be less than 5000 characters"),
});

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input with zod schema
    const validationResult = contactSchema.safeParse(formData);

    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      toast.error(firstError.message);
      return;
    }

    setSubmitting(true);
    try {
      // Simulate email send (will be replaced with actual edge function call)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions? Get in touch with our editorial team.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={6}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-6">Contact Info</h2>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <Mail className="w-6 h-6 text-primary" />
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <a href="mailto:ajvsc@unijos.edu.ng" className="text-muted-foreground hover:text-primary">
                          ajvsc@unijos.edu.ng
                        </a>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <MapPin className="w-6 h-6 text-primary" />
                      <div>
                        <h3 className="font-semibold mb-1">Address</h3>
                        <div className="text-muted-foreground">
                          <p>Faculty of Veterinary Medicine, University of Jos </p>
                          <p>PMB 2084, Jos</p>
                          <p>Plateau State</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Phone className="w-6 h-6 text-primary" />
                      <div>
                        <h3 className="font-semibold mb-1">Editorial Office</h3>
                        <p className="text-muted-foreground">+234 8035907570</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Editorial Team</h2>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-semibold">Managing Editor</p>
                      <p className="text-muted-foreground">Dr. Idris Ayodeji Azeez</p>
                      <a href="mailto:azeezi@unijos.edu.ng" className="text-primary hover:underline">
                        azeezi@unijos.edu.ng
                      </a>
                    </div>
                    <div>
                      <p className="font-semibold">Deputy Editor-in-Chief</p>
                      <p className="text-muted-foreground">Dr. Ameji, Negedu Onogu</p>
                      <a href="mailto:amejio@unijos.edu.ng" className="text-primary hover:underline">
                        amejio@unijos.edu.ng
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="mt-8">
            <CardContent className="p-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2504.3931755361778!2d8.890037084363026!3d9.949504705618413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105373fd274d9641%3A0x216a87069c3ea3f7!2sFaculty%20Of%20Veterinary%20Medicine%20University%20Of%20Jos!5e0!3m2!1sen!2sng!4v1762039915219!5m2!1sen!2sng"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Faculty of Veterinary Medicine University of Jos Location"
                className="rounded-lg"
              />
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
