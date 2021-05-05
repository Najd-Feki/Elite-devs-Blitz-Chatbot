import React,{ useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import axios from 'axios'
import Header from "components/headers/light";
import Footer from "components/footers/SimpleFooter";
const DataTable = () => {
const [data,setData] = useState();
    useEffect(() => {
        axios.get("http://localhost:5000/allcourses").then(function (response) {
      setData(response.data);
    console.log(response.data);
    });
    }, [])
const columns=[
    {
        title: 'Title', field: 'title',
    },
    {
        title: 'Field', field: 'field',
    },
    {
        title: 'Tutor Name', field: 'tutorName',
    },
    {
        title: 'createdAt', field: 'createdAt',
    },
]
    return (
        <div>
                <Header />
                <br/>
                <br/>
                <br/>
            <h1 style={{textAlign: 'center'}}>Course List</h1>
                <br/>
        <div>
            
                <MaterialTable title="Courses List" data={data} columns={columns} options={{exportButton:true}} />
        </div>
        <br/>
                <br/>
                <br/>
                <br/>
        <Footer />
        </div>
    )
}

export default DataTable
