import * as React from "react";
import * as faker from "faker";
import * as _ from "lodash";
import { MemoryRouter } from "react-router";

import { Menu, Listing } from ".";
import { useState } from "react";

const articles = _.times(10, (i) => [i, [false, false, true][i % 3]]).map(
  ([i, isCommon]) => ({
    slug: `slug-${i}`,
    title: `${isCommon ? "Common" : "Not common"} ${faker.lorem.words(2)}`,
    description: faker.lorem.words(10),
    posterImage: `http://localhost:${6060}/example-image/portrait-1.jpg`,
    category: ["First", "Second"][_.random(0, 1)],
    isCommon,
  }),
);

articles.push({
  slug: `slug-second`,
  title: "Ab - Second item",
  description: faker.lorem.words(10),
  posterImage: `http://localhost:${6060}/example-image/portrait-1.jpg`,
  category: "First",
  isCommon: true,
});

articles.push({
  slug: `slug-first`,
  title: "Aa - First item",
  description: faker.lorem.words(10),
  posterImage: `http://localhost:${6060}/example-image/portrait-1.jpg`,
  category: "First",
  isCommon: true,
});

const getItemCategory = (item: any) => item.category || "Others";

export const DemoStandard = () => {
  const [favouritesFilter, setFavouritesFilter] = useState<boolean>(true);
  const [searchfilter, setSearchFilter] = useState<boolean>(true);

  const toggleFavourites = () => setFavouritesFilter(!favouritesFilter);
  const toggleSearch = () => setSearchFilter(!searchfilter);

  return (
    <MemoryRouter>
      <p>
        <button onClick={toggleFavourites}>Toggle favourites</button>
        <button onClick={toggleSearch}>Toggle search</button>
      </p>
      <div
        style={{ display: "flex" }}
        data-test="PrefabArticle-scenario-simple"
      >
        <div
          style={{ width: "200px" }}
          data-test="PrefabArticle-menu-container"
        >
          <Menu content={articles} getItemCategory={getItemCategory} />
        </div>
        <div style={{ flex: 1 }} data-test="PrefabArticle-listing-container">
          <Listing
            title={"My content"}
            content={articles}
            getItemCategory={getItemCategory}
            isFavourite={favouritesFilter ? (i) => i.isCommon : undefined}
            showSearch={searchfilter}
          />
        </div>
      </div>
    </MemoryRouter>
  );
};
