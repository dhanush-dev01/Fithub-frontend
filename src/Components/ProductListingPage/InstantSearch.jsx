import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/satellite.css";
import { Hits, InstantSearch, SearchBox, Configure } from "react-instantsearch";

import { Hit } from "./hit";

const searchClient = algoliasearch("YDUH36G8N8", "cc72c5c2c17919ef70345f9e22ef0159");

export const Search = () => {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="Joghub"
    >
      <Configure hitsPerPage={20} />
      <div className="ais-InstantSearch">
        <SearchBox />
        <Hits hitComponent={Hit} />
      </div>
    </InstantSearch>
  );
};