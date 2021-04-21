import React from "react";
import Header from "components/headers/light.js";

import '../assets/reclamation/reclamation.css'
export default () => {
    return (
      <>
        <Header />
        <div class="container">
  <h2>Here you can post our complaints</h2>
  <h1>send us </h1>
  
  <form action="" >
    <div class="fields">
    <p>Name</p>
      <span>
       <input placeholder="Name" type="text" />
    </span>
    <br />
    <p>Subject</p>
     <span>
       <input placeholder="type" type="type" />
    </span>
    <br />
    <span>
        <p>your complaint</p>
       <textarea placeholder="description" type="description" rows="4" cols="50" />
    </span>
    </div>
    <div class="submit">
      <input class="submit" value="send" type="button" />
    </div>
  </form>
</div>
        
    </>
    );
};