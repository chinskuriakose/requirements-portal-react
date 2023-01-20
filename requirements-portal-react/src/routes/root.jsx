import React from 'react'
import { useEffect } from 'react';
import {
    Form,
    Link,
    Outlet,
    NavLink,
    redirect,
    useLoaderData,
    useNavigation,
    useSubmit
} from 'react-router-dom'
import { getServicesList } from '../utils'
// import { createService } from '../utils'
import svg from '../assets/home-button.svg'

export async function action() {
    // const service = await createService();
    return redirect(`/services`)
}

export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get('q');
    const services = getServicesList(q);
    console.log(services)
    return { services, q };
}

export default function Root() {

    const { services, q } = useLoaderData();
    const navigation = useNavigation();
    const submit = useSubmit();

    const searching =
        navigation.location &&
        new URLSearchParams(navigation.location.search).has(
            "q"
        );

    useEffect(() => {
        document.getElementById('q').value = q;
    })

    return (
        <>
            <div id='sidebar'>
                <h1>Atgeir Solutions</h1>
                <NavLink to="/"  rel="noreferrer">
                    <img src={svg} alt="Home button" width="50"></img>
                </NavLink>
                
                
                <div>
                    <Form id='search-form' role='search'>
                        <input
                            type="search"
                            id='q'
                            className={searching ? "loading" : ""}
                            aria-label='Search services'
                            placeholder='Search services'
                            name='q'
                            defaultValue={q}
                            onChange={(event) => {
                                const isFirstSearch = q == null;
                                submit(event.currentTarget.form, {
                                    replace: !isFirstSearch,
                                });
                            }}
                        />
                        <div
                            id='search-spinner'
                            aria-hidden
                            hidden={!searching}
                        />
                        <div
                            className='sr-only'
                            aria-live='polite'
                        />
                    </Form>
                    <Form method='post'>
                        <button type='submit'>View all</button>
                    </Form>
                </div>
                <nav>
                    {services.length ? (
                        <ul>
                            {services.map((service) => (
                                <li key={service}>
                                    <NavLink
                                        to={`services/${service}`}
                                        className={({ isActive, isPending }) =>
                                            isActive
                                                ? "active"
                                                : isPending
                                                    ? "pending"
                                                    : ""
                                        }
                                    >
                                        {/* <Link to={`services/${service}`}> */}
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
            <div id='detail' className={
                navigation.state === 'loading' ? 'loading' : ''
            }>
                <Outlet></Outlet>
            </div>
        </>
    )
}
