import * as React from "react";
import { useState } from "react";
import { MemoryRouter } from "react-router";
import * as faker from "faker";
import * as _ from "lodash";

import * as exampleImage from "../../../../../baseConfig/stock-images/landscape-1.jpg";

import { ArticleComponent } from "./";

// TODO move to mock data folder
const article: any = {
  title:
    "Elit incididunt ad adipisicing velit Ipsum irure anim cillum incididunt",
  subtitle:
    "Quis cillum cupidatat occaecat dolore aliqua magna incididunt ad incididunt magna. Incididunt ipsum in tempor consectetur et nisi do ullamco qui ex ut anim sint. Excepteur amet esse dolor enim ea excepteur dolore id. In do veniam quis dolor sunt Lorem excepteur pariatur minim eu dolore. Id excepteur duis laboris pariatur laborum in sit nisi pariatur tempor",
  posterImage: exampleImage,
  authors: [
    {
      name: "Bill Murray",
      profileImage: exampleImage,
      profileUrl: null,
    },
  ],
  postDate: 1562640240000,
  content: [
    {
      type: "heading",
      anchorId: 1,
      content: "First section",
    },
    {
      type: "image",
      imageUrl: exampleImage,
      caption: faker.lorem.words(10),
      size: "small",
      position: "right",
    },
    {
      type: "text",
      content: _.times(2, () => `<p>${faker.lorem.words(100)}</p>`).join(""),
    },
    {
      type: "image",
      imageUrl: exampleImage,
      caption: faker.lorem.words(5),
      size: "small",
    },
    {
      type: "text",
      content: _.times(2, () => `<p>${faker.lorem.words(100)}</p>`).join(""),
    },
    {
      type: "image",
      imageUrl: exampleImage,
      caption: faker.lorem.words(20),
    },
    {
      type: "heading",
      content: `Gallery (with multiple images)`,
    },
    {
      type: "text",
      content: `<p>${faker.lorem.words(100)}</p>`,
    },
    {
      type: "gallery",
      images: [
        {
          original:
            "https://d1qr34qzhiwpdo.cloudfront.net/articles/600x600_190521_235454.jpg?mtime=20190522095454",
          thumbnail:
            "https://d1qr34qzhiwpdo.cloudfront.net/articles/_galleryThumbnail/600x600_190521_235454.jpg?mtime=20190522095454",
          full: "https://d1qr34qzhiwpdo.cloudfront.net/articles/_galleryFull/600x600_190521_235454.jpg?mtime=20190522095454",
        },
        {
          original:
            "https://d1qr34qzhiwpdo.cloudfront.net/articles/600x701_190521_235455.jpg?mtime=20190522095455",
          thumbnail:
            "https://d1qr34qzhiwpdo.cloudfront.net/articles/_galleryThumbnail/600x701_190521_235455.jpg?mtime=20190522095455",
          full: "https://d1qr34qzhiwpdo.cloudfront.net/articles/_galleryFull/600x701_190521_235455.jpg?mtime=20190522095455",
        },
        {
          original:
            "https://d1qr34qzhiwpdo.cloudfront.net/articles/460x300_190521_235456.jpg?mtime=20190522095456",
          thumbnail:
            "https://d1qr34qzhiwpdo.cloudfront.net/articles/_galleryThumbnail/460x300_190521_235456.jpg?mtime=20190522095456",
          full: "https://d1qr34qzhiwpdo.cloudfront.net/articles/_galleryFull/460x300_190521_235456.jpg?mtime=20190522095456",
        },
      ],
      description:
        "A selection of Bill Murrays (what's the plural for Bill Murray?)",
    },
    {
      type: "text",
      content: `<p>${faker.lorem.words(100)}</p>`,
    },
    {
      type: "heading",
      content: `Gallery with a single image`,
    },
    {
      type: "gallery",
      images: [
        {
          original:
            "https://d1qr34qzhiwpdo.cloudfront.net/articles/460x300_190521_235456.jpg?mtime=20190522095456",
          thumbnail:
            "https://d1qr34qzhiwpdo.cloudfront.net/articles/_galleryThumbnail/460x300_190521_235456.jpg?mtime=20190522095456",
          full: "https://d1qr34qzhiwpdo.cloudfront.net/articles/_galleryFull/460x300_190521_235456.jpg?mtime=20190522095456",
        },
      ],
      description: "Gallery with a single image",
    },
    {
      type: "heading",
      content: `A file resource`,
    },
    {
      type: "resource",
      title: "My resource",
      description:
        "Cupidatat enim sit labore in ex nulla ea aliquip dolor aliquip in ad.",
      assetUrl: exampleImage,
    },
    {
      type: "heading",
      content: `Videos`,
    },
    {
      type: "video",
      videoProvider: "youtube",
      videoId: "72NfSwCzFVE",
    },
    {
      type: "heading",
      anchorId: "second",
      content: "Second section",
    },
    {
      type: "text",
      content: `<p>${faker.lorem.words(100)}</p>`,
    },
    {
      type: "text",
      content: `<p>${faker.lorem.words(100)}</p>`,
    },
    {
      type: "heading",
      anchorId: "second",
      content: "Missing content types",
    },
    {
      type: "unknown",
      content: faker.lorem.words(100),
    },
  ],
};

const landscape = false;

const style: React.CSSProperties = landscape
  ? {
      position: "fixed",
      top: 0,
      left: 0,
      width: "1920px",
      height: "1080px",
      zIndex: 1000,
      backgroundColor: "white",
      border: "1px solid red",
    }
  : {};

const nextArticle = article;

const articleParent = {
  title: "Introductory course",
  to: "/",
};

export const DemoStandard = () => {
  const [landscape, setLandscape] = useState<boolean>(false);
  const [shownextarticle, setShowNextArticle] = useState<boolean>(false);
  const [showparentarticle, setShowParentArticle] = useState<boolean>(false);
  return (
    <>
      <div className="debug">
        <a onClick={() => setLandscape(!landscape)}>
          {landscape ? "Set to portrait" : "Set to landscape"}
        </a>
        {" | "}
        <a onClick={() => setShowNextArticle(!shownextarticle)}>
          {shownextarticle ? "Hide next article" : "Show next article"}
        </a>
        {" | "}
        <a onClick={() => setShowParentArticle(!showparentarticle)}>
          {showparentarticle ? "Hide parent" : "Show parent"}
        </a>
      </div>
      <div style={style}>
        <MemoryRouter>
          <ArticleComponent
            article={article}
            landscape={landscape}
            nextArticle={shownextarticle ? nextArticle : undefined}
            articleParent={showparentarticle ? articleParent : undefined}
          />
        </MemoryRouter>
      </div>
    </>
  );
};
