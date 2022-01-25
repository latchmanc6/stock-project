import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.ticker.toUpperCase().includes(searchWord.toUpperCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
      <>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2 searchInput"
            aria-label="Search"
            placeholder={placeholder}
            value={wordEntered}
            onChange={handleFilter}
            style={{width: "300px"}}
          />

          <div className="searchIcon">
            {filteredData.length === 0 ? (
              <SearchIcon />
            ) : (
              <CloseIcon id="clearBtn" onClick={clearInput} />
            )}
          </div>

          {filteredData.length !== 0 && (
            <div className="dataResult">
              {filteredData.slice(0, 15).map((value, key) => {
                return (
                  <a key={key} className="dataItem" href={"/trade/" + value.ticker}>
                    <p>{value.ticker} </p>
                  </a>
                );
              })}
            </div>
          )}
        </Form>
      </>
    // <div className="search">
    //   <div className="searchInputs">
    //     <input
    //       type="text"
    //       type="Search"
    //       placeholder={placeholder}
    //       value={wordEntered}
    //       onChange={handleFilter}
    //     />
    //     <div className="searchIcon">
    //       {filteredData.length === 0 ? (
    //         <SearchIcon />
    //       ) : (
    //         <CloseIcon id="clearBtn" onClick={clearInput} />
    //       )}
    //     </div>
    //   </div>
    //   {filteredData.length !== 0 && (
    //     <div className="dataResult">
    //       {filteredData.slice(0, 15).map((value, key) => {
    //         return (
    //           <a key={key} className="dataItem" href={"/trade/" + value.ticker}>
    //             <p>{value.ticker} </p>
    //           </a>
    //         );
    //       })}
    //     </div>
    //   )}
    // </div>
  );
}

export default SearchBar;
