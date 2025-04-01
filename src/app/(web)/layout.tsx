import React from "react";

import Footer from "~/components/footer";
import Header from "~/components/header";

type Props = {
  children: React.ReactNode;
};

export default async function WebLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col py-4">{children}</main>
      <Footer />
    </>
  );
}
