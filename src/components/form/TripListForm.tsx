"use client"

import { useFieldArray, useFormContext } from 'react-hook-form';
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
                <div className="grid grid-cols-4 gap-4">
                    {fields.map((field, index) => {
                                if (quantity) {
                                    return ( 
                                        <InputQuantityElement
                                            key={field.id}
                                            id={`${name}.${index}`}
                                            remove={() => remove(index)}
                                            append={append}
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
                                            append={append}
                                            {...form.register(`${name}.${index}`)}
                                        />
                                    )
                                }
                            }
                        )
                    }
                </div>
                <div>
                    <br />
                { (name==="month" || name==="year") &&
                        <Button
                            type="button"
                            variant="default"
                            size="default"
                            onClick={() => append({miles: 0, amount: 1})}
                            >Add Trip</Button>
                }
                { !(name==="month" || name==="year") && 
                        <Button
                    type="button"
                    variant="default"
                    size="default"
                    onClick={() => append({miles: 0})}
                >Add Trip</Button>
                    }
                    </div>
            </CardContent>
        </Card>
    )
}