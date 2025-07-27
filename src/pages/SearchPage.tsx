import { useSearchRestaurants } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { type SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [SearchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch"
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { results, isLoading } = useSearchRestaurants(SearchState, city);

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1
    }))
  }
  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };
  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };
  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (!results?.data || !city) {
    return (
      <p className="text-lg">
        No restaurants found for{" "}
        <span className="font-bold text-2xl">{city}</span> .
      </p>
    );
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <CuisineFilter
          selectedCuisines={SearchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpanded={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={SearchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by cuisine or Restaurant name"
          onReset={resetSearch}
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo city={city} total={results.pagination.total} />
          <SortOptionDropdown sortOption={SearchState.sortOption} onChange={(value) => setSortOption(value)} />
        </div>
        {results.data.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;
