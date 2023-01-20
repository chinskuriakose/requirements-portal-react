// import { keys } from 'localforage';
import React, { Fragment } from 'react'
import {
    Form,
    redirect,
    useLoaderData,
    useNavigate
} from 'react-router-dom';
import { updateService } from '../utils';

export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    console.log(updates);
    await updateService(params.serviceId)
    return redirect(`/services/${params.serviceName}`);
}

export async function loader({ request, params }) {
    const serviceName = params.serviceName;
    // console.log(serviceName)
    // const url = new URL(request.url)
    // if (url.pathname.split("/"))
    const { props } = await import(`../serviceProperties/${serviceName}.js`)
    // console.log(props)

    return { props, serviceName }
}

export default function EditService() {
    const navigate = useNavigate();
    const { props, serviceName } = useLoaderData();
    // console.log(props)
    // console.log(serviceName)
    const propNames = Object.keys(props);

    // console.log(propNames)

    const InputElement = ({ json, propname, formid }) => {
        const keyList = Object.keys(json)
        // console.log(keyList)
        const desc = json.Description

        const type = json.Type;
        // console.log(type)
        if (type == "radio") {
            const options = json.Options;
            // console.log(options)
            return (
                // <Form method='post' id={`${propname}`}>
                <fieldset>
                    <legend>{propname}</legend>
                    <p>📚 - {desc}</p>
                    {/* <ul style={{ listStyleType: 'none' }}> */}
                    {
                        options.map((option) => (
                            // <li key={`${propname}-${option}`}>
                            <div key={`${propname}-${option}`}>
                                <label htmlFor={`${propname}-${option}`} form={formid}>{option}</label>
                                <input type={type} id={`${propname}-${option}`} value={option} form={formid} name={propname} />
                                <br />
                            </div>
                        ))
                    }
                    {/* </ul> */}
                </fieldset>
                // </Form>
            );
        } else {
            return (
                <fieldset>
                    <legend>{propname}</legend>
                    <p>📚 - {desc}</p>
                    <div>
                        {/* <label htmlFor={`${propname}-${option}`} form={`${propname}`}>{option}</label> */}
                        <input type={type} id={propname} form={formid} name={propname} />
                    </div>
                </fieldset>
            )
        }
    }

    return (
        <div id='service'>
            {/* <h1>{serviceName}</h1> */}
            <Form method='post'>
                <fieldset>

                    <ul style={{ listStyleType: 'none' }}>
                        {
                            propNames.map((prop) => (
                                <li key={`outer-li-${prop}`}>
                                    <InputElement json={props[prop]} propname={prop} />
                                </li>
                            )
                            )
                        }
                    </ul>
                    <button type='submit'>Submit</button>
                    <button
                        type='button'
                        onClick={
                            () => {
                                navigate(-1);
                            }
                        }>Cancel</button>
                </fieldset>
            </Form>

        </div>
    )
}
