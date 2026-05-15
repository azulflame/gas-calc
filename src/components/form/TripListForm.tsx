"use client"

import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import InputElement from './InputElement';
import InputQuantityElement from './InputQuantityElement';


export default function TripListForm({name, quantity, ...props}: {name: string, quantity?: boolean}) {

    const form = useFormContext()

    const { fields, append, remove } = useFieldArray({
        control: form.control, 
        name: name
    });


    return (
        <Card>
            <CardHeader>
                <CardTitle>{name.at(0)?.toUpperCase() + name.slice(1).toLowerCase()}</CardTitle>
            </CardHeader>
            <CardContent>
                {fields.map((field, index) => {
                            if (quantity) {
                                return ( 
                                    <InputQuantityElement
                                        key={field.id}
                                        id={`${name}.${index}`}
                                        remove={() => remove(index)}
                                        {...form.register(`${name}.${index}`)}
                                    />
                                )
                            }
                            else {
                                return (
                                    <InputElement
                                        key={field.id}
                                        id={`${name}.${index}`}
                                        remove={() => remove(index)}
                                        {...form.register(`${name}.${index}`)}
                                    />
                                )
                            }
                        }
                    )
                }
                { (name==="month" || name==="year") &&
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => append({miles: 0, quantity: 1})}
                            >Add Trip</Button>
                }
                { !(name==="month" || name==="year") && 
                        <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({miles: 0})}
                >Add Trip</Button>
                    }
            </CardContent>
        </Card>
    )
}