import React from 'react'
import "../styles.css"
import { API } from "../backend";
import Base from "./Base"

export default function Home() {
    console.log("API IS", API)

    return (
        <Base title="Home page" description="Welcome to Home page">
            <div className="row">
                <div className="col-4">
                    <button className="btn btn-success">Test</button>
                </div>
                <div className="col-4"></div>
                <div className="col-4"></div>
            </div>
        </Base>
    )
}
