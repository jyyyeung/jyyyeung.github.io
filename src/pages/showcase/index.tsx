import React from "react";
import Layout from "@theme/Layout";

import ShowcaseCard from "./_components/ShowcaseCard";
import { cases } from "./_data";

function ShowcaseHeader() {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <h1>Jasmine's Projects</h1>
      <p>Partial list of projects Jasmine was involved</p>
      <a
        className="button button--primary"
        href="https://github.com/jyyyeung"
        target="_blank"
        rel="noreferrer"
      >
        View Source
      </a>
    </section>
  );
}

function ShowcaseCards() {
  return (
    <section className="container">
      <div className="row">
        {cases.map((item) => (
          <div key={item.title} className="col col--3 margin-bottom--lg">
            <ShowcaseCard {...item} />
          </div>
        ))}
      </div>
    </section>
  );
}

function Showcase() {
  return (
    <Layout title="Showcase">
      <main className="margin-vert--lg">
        <ShowcaseHeader />
        <ShowcaseCards />
      </main>
    </Layout>
  );
}

export default Showcase;
