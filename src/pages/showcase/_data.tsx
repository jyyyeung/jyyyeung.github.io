import React from "react";
import Link from "@docusaurus/Link";

import { Case } from "./_components/ShowcaseCard";

export const cases: Case[] = [
  {
    title: "SCCCE",
    website: "https://jyyyeung.github.io/SCCCE/",
    preview: require("./_previews/sccce.png").default,
    description: (
      <>
        Security Compliance Checker for Cloud Environments
        <br />- Collect Cloud Configuration Data
        <br />- Analyze Cloud Configuration Data
        <br />- Generate Security Compliance Report
        <br />- CLI Decoupled Data Collection
      </>
    ),
    source: "",
    tags: ["golang", "cloud", "VueJS", "TS"],
  },
  {
    title: "String Pod",
    website: "https://jyyyeung.github.io/stringpod/",
    preview: require("./_previews/stringpod.png").default,
    description: (
      <>
        String Pod for String Manipulation
        <br />
        <b>Type: </b> Python Library
      </>
    ),
    source: "https://github.com/jyyyeung/stringpod",
    tags: ["Python"],
  },
  {
    title: "香港極拳道武術協會新網站",
    website: "https://hksanda.vercel.app/",
    preview: require("./_previews/hksanda.png").default,
    description: (
      <>
        A new website for the Martial Arts Association
        <br />
        <b>Dynamic Content Update</b>: CMS + Image Upload
        <br />
        <b>SEO</b>: Sitemap + SEO Optimized
      </>
    ),
    source: "https://github.com/jyyyeung/hksanda-website",
    tags: ["Nuxt", "TS", "Full Stack"],
  },
  {
    title: "TVSD",
    website: "https://jyyyeung.github.io/TVSD/",
    preview: require("./_previews/tvsd.png").default,
    description: (
      <>
        TV Series Downloader
        <br />
        <b>Platform</b>: CLI
      </>
    ),
    source: "https://github.com/jyyyeung/TVSD",
    tags: ["Python", "CLI"],
  },
  {
    title: "Shared Calendar Mobile App",
    website: "https://github.com/jyyyeung/SharedCalendarApp",
    preview: require("./_previews/shared-calendar.png").default,
    description: (
      <>
        This application provides a convenient way to manage the timetable within a group.
        <br />
        <b>Database</b>: Firebase
        <br />
        <b>Platform</b>: Android
      </>
    ),
    source: "https://github.com/jyyyeung/SharedCalendarApp",
    tags: ["Kotlin", "Android", "Firebase"],  
  },
  
  {
    title: "Tetris Match",
    website: "https://github.com/jyyyeung/tetris-match",
    // preview: require("./_previews/tetris-match.png").default,
    preview: require("./_previews/sccce.png").default,
    description: (
      <>
        A Multiplayer Real-Time Tetris Game
        <br />
        <b>Platform</b>: Web
      </>
    ),
    source: "https://github.com/jyyyeung/tetris-match",
    tags: ["VanillaJS", "Socket.io"],
  },
  {
    title: "Five Buckets",
    website: "https://five-buckets.web.app/",
    preview: require("./_previews/five-buckets.png").default,
    description: (
      <>
        Five Buckets for income management
        <br />
        <b>Platform</b>: Web
      </>
    ),
    source: "https://github.com/jyyyeung/five-buckets",
    tags: ["VueJS","Firebase"],
  },
  {
    title: "Bridemaid Dress Quiz",
    website: "https://myprojectbride-quiz.netlify.sheepyy039.xyz/",
    preview: require("./_previews/bridesmaid-dress-quiz.png").default,
    description: (
      <>
        A quiz for brides to find their perfect bridesmaid dress
        <br />
        <b>Platform</b>: Web
      </>
    ),
    source: "https://github.com/jyyyeung/Bridemaid-Dress-Quiz",
    tags: ["ReactJS", "Firebase"],
  },
];
