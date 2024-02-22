import React from "react";
import { Route, Routes } from "react-router-dom";
import ResponsiveDrawer from "../components/SideBar/sideBar";
import EnhancedTable from "../components/table/Table";
import LightTable from "../components/lightTable/lightTable";
import LocationMap from "../components/locationMap/location";
import AddLightModel from "../components/lightTable/AddLightModel";

export default function AdminRoute(){
    return(
        <Routes>
            <Route>
                <Route exact path="layout" element={<ResponsiveDrawer/>}>
                    <Route path="table" element={<LightTable/>}/> 
                    <Route path="map" element={<LocationMap/>}/>
                    <Route path="addLight" element={<AddLightModel/>}/>
                </Route>
            </Route>
        </Routes>
    )
}