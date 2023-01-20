import React from 'react'
import {
    Form,
    NavLink,
    Outlet,
    redirect,
    useLoaderData,
    useNavigation
} from 'react-router-dom';
import { createService, getServices } from '../utils';

// export async function loader({ params }) {
//     // const url = new URL(request.url);
//     // console.log(url);
//     // console.log(typeof url);
//     // const serviceName = url.pathname.split("/").pop();
//     // console.log(serviceName);
//     console.log(params)
//     // const q = url
//     const serviceName = params.serviceName

//     return serviceName
// }

export async function action({ request, params }) {
    const newService = await createService(params.serviceName);
    return redirect(`/services/${newService.serviceName}/${newService.id}/edit`)
}

export async function loader({params}) {
    const serviceName = params.serviceName;
    const createdServices = await getServices(params.serviceName);
    console.log(createdServices)
    return {createdServices, serviceName};
}

export default function Service() {

    const {createdServices, serviceName} = useLoaderData();
    const navigation = useNavigation();
    console.log(createdServices)


    return (
        <>
            <div id='contact'>
                <h1>{serviceName} </h1>
                <Form method='post' style={{'paddingLeft':'50px', 'paddingRight' :'auto'}}>
                    <button type='submit'>Add configurations</button>
                </Form>
            </div>
            <div>
                <h2 style={{'textAlign' : 'left'}}>Current configurations</h2>
                
                {createdServices.length  ? (
                        <ul>
                            {createdServices.map((service) => (
                                <li key={service.id}>
                                    <NavLink 
                                    to={`/services/${service.serviceName}/${service.id}/edit`}
                                    >
                                        {service.serviceName} - {service.id}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                        ) : null
                }
                
                
            </div>
            <div id='service-child' className={
                navigation.state === "loading" ? "loading" : ""
            }>
                <Outlet></Outlet>
            </div>
        </>
    )
}
