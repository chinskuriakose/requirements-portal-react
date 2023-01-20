import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { 
    redirect, 
    useLoaderData, 
    useNavigate,
    NavLink ,
    Link
} from 'react-router-dom'
import { services } from '../service_list.js'
import { createService } from '../utils.js';
// import Select from 'react-select/dist/declarations/src/Select';

export async function action() {
    const service = await createService();
    return redirect(`/services/${service.name}/${service.id}/edit`)
}


export default function ServiceSelector() {

    // const services = useLoaderData();
    // const services = Array(`${serviceList}`)

    const [open, setOpen] = useState(false);
    const [buttonText, setButtonText] = useState('Click');
    const [labelText, setLabelText] = useState('Available Services')

    const handleOpen = () => {
        setOpen(!open)
    }

    const handleSelect = async (event) => {
        const navigate = useNavigate()
        // console.log(event);
        setButtonText(event.target.textContent);
        setLabelText('Selected Service')
        setOpen(false);
        const service = await createService();
        navigate(`/services/${service.id}/edit`)

        // action();
    }

    return (
        <div id='contact'>
            <div className='dropdown'>
                <label id='service-label'>{labelText}</label>
                <nav>
                    {services.length ? (
                        <ul>
                            {services.map((service) => (
                                <li key={service}>
                                    <NavLink
                                        to={`/services/${service}/`}
                                        className={({isActive, isPending}) =>
                                            isActive
                                                ? "active"
                                                : isPending
                                                    ? "pending"
                                                    : ""
                                    }
                                    >
                                        {/* <Link to={`/services/${service}`}> */}
                                            {service}
                                        {/* </Link> */}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    ) : ""
                    }
                </nav>
            </div>
        </div>
    )
}
