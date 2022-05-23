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

  const handleChange = () =>{
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
    }
  const searchData = (value) => {
    setSearchTerm(value);
  };


  return (
    <div style={{ padding: 20}}>
      <Input style={{ padding: 5, margin: 5 }}  placeholder="Id" onChange={(e) => searchData(e.target.value)}  />
      <Input style={{ padding: 5, margin: 5 }} placeholder="Name"  onChange={ (e) => searchData(e.target.value)} />

      <Button style={{ padding: 10, margin: 10 }} type="submit" onClick={(e) => handleChange(e.target.value)}>Search</Button>

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
