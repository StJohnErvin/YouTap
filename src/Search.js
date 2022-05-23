import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Input, Button } from "semantic-ui-react";

const Search = ()  => {
  const [APIData, setAPIData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then((response) => {
      setAPIData(response.data);
    });
  }, []);

  const searchData = (value) => {
    setSearchTerm(value);
    if (searchTerm !== "") {
      const filteredData = APIData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(APIData);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Input  placeholder="Id" onChange={(e) => searchData(e.target.value)}  />
      <Input placeholder="Name"  />

      <Button style={{ padding: 10, margin: 10 }}onClick={(e) => searchData(e.target.value)}>Search</Button>

      <Card.Group itemsPerRow={3} style={{ marginTop: 20 }}>
        {searchTerm.length > 1
          ? filteredResults.map((item) => {
              return (
                <Card>
                  <Card.Content>
                    <Card.Header>{item.id}</Card.Header>
                    <Card.Description>{item.email}</Card.Description>
                    <Card.Description>{item.phone}</Card.Description>
                  </Card.Content>
                </Card>
              );
            })
          : APIData.map((item) => {
              return (
                <Card>
                  <Card.Content>
                    <Card.Header>{item.id}</Card.Header>
                    <Card.Description>{item.email}</Card.Description>
                    <Card.Description>{item.phone}</Card.Description>
                  </Card.Content>
                </Card>
              );
            })}
      </Card.Group>
    </div>
  );
}

export default Search;
