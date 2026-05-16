"use client"

import { Controller, useFormContext } from 'react-hook-form';
import { Field, FieldGroup } from '@/components/ui/field';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group';

interface InputElementProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    placeholder?: string;
    description?: string;
    isOptional?: boolean;
    inputClassName?: string;
    outputClassName?: string;
    remove?: () => void,
    append: ({}) => void,

}

const InputElement: React.FC<InputElementProps> = ({name, remove, append, ...props}) => {

        const form = useFormContext();

    return (
        <Card>
            <CardContent>
                <div className="justify-center items-center grid-cols-1">
                    <FieldGroup>
                        <Field>
                            <InputGroup>
                                <InputGroupAddon align="inline-start">From:</InputGroupAddon>
                                <InputGroupInput {...form.register(`${name}.from`)}/>
                            </InputGroup>
                        </Field>
                        <Field>
                            <InputGroup>
                                <InputGroupAddon align="inline-start">To: </InputGroupAddon>
                                <InputGroupInput {...form.register(`${name}.to`)}/>
                            </InputGroup>
                        </Field>
                        <Field>
                            <InputGroup>
                                <InputGroupAddon align="inline-start">Miles:</InputGroupAddon>
                                <Controller
                                    name={`${name}.miles`}
                                    control={form.control}
                                    render={({field, fieldState}) => (
                                    <InputGroupInput
                                        {...form.register(`${name}.miles`)}
                                        {...field}
                                        type="number"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    )}
                                />
                            </InputGroup>
                        </Field>
                        <Field>
                            <center>
                                <Button onClick={remove} variant="destructive">Remove</Button>
                                <Button variant="outline" onClick={() => append(
                                        {
                                            to: form.getValues(`${name}.from`),
                                            from: form.getValues(`${name}.to`),
                                            miles: form.getValues(`${name}.miles`),
                                        }
                                        )}>Round Trip
                                    </Button>
                            </center>
                        </Field>
                    </FieldGroup>
                </div>
            </CardContent>
        </Card>
    )
}

export default InputElement;