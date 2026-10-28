import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact | ShopCase</title>
      </Head>

      <h1 className="text-2xl font-bold text-stone-900">Contact</h1>
      <p className="mt-4 text-stone-600">
        Have a question about our products? Reach out to us.
      </p>

      <ul className="mt-6 space-y-2 text-stone-700">
        <li>Email: hello@shopcase.example</li>
        <li>Phone: +62 812 0000 0000</li>
        <li>Address: Jakarta, Indonesia</li>
      </ul>
    </>
  );
}