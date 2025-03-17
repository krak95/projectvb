import './Item.css'
import axios from 'axios'
import { fetchItemsAXIOS } from '../../API/Axios/axios'
import { Outlet, NavLink, Route, Routes } from "react-router-dom"
import { useState, useEffect } from 'react'

export default function Item({ project, equipment }) {

    const [items, setItems] = useState([])

    const fetchItems = async () => {
        const res = await fetchItemsAXIOS({ project, equipment })
        console.log(res)
        console.log('fetchitems')
        setItems(res.data[0])
    }


    useEffect(() => {
        console.log('useeffect itemjsx')
        fetchItems()
    }, [])

    return (
        <>
            <div className="itemContentDiv">
                {items.map((e, key) =>
                    <>
                        <div>
                            {e.project} : {e.device}
                        </div>
                    </>
                )}
            </div>
        </>
    )
}