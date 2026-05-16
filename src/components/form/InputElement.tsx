"use client"

import { Controller, useFormContext } from 'react-hook-form';
import {Field, FieldContent, FieldGroup, FieldLabel, FieldDescription} from '@/components/ui/field';
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';

interface InputElementProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    placeholder?: string;
    description?: string;
    isOptional?: boolean;
    inputClassName?: string;
    outputClassName?: string;
    remove?: () => void

}

const InputElement: React.FC<InputElementProps> = ({name, remove, ...props}) => {

        const form = useFormContext();

    return (
        <Card>
            <CardContent>
                <div className="justify-center items-center grid-cols-1">
                    <FieldGroup>
                    <Field>
                        <FieldLabel>From:</FieldLabel>
                        <Input {...form.register(`${name}.from`)}/>
                    </Field>
                    <Field>
                        <FieldLabel>To:</FieldLabel>
                        <Input {...form.register(`${name}.to`)}/>
                    </Field>
                    <Field>
                        <FieldLabel>Miles:</FieldLabel>
                        <Input {...form.register(`${name}.miles`)}/>
                    </Field>
                    <Field>
                        <center>
                            <Button onClick={remove} variant="destructive">Remove</Button>
                        </center>
                    </Field>
                    </FieldGroup>
                </div>
            </CardContent>
        </Card>
    )
}

export default InputElement;