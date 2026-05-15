"use client"

import { Controller, useFormContext } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import TripListForm from "./TripListForm";
import { Field, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { mileage_defaults } from '../../../app/page';
import { Button } from '../ui/button';

export default function MileageForm({data}: {data: typeof mileage_defaults}) {

    const form = useFormContext();

    return (
        <Card className="grid grid-cols-5">
                <div className="col-span-4">
                <CardHeader>
                    <CardTitle>Gas Budget Calculator</CardTitle>
                    <CardDescription>Plan out your monthly gas expenses based on your normal driving trips</CardDescription>
                </CardHeader>
                <CardContent>
                    <Card>
                        <CardHeader>
                            <CardTitle>Weekly Trips</CardTitle>
                            <CardDescription>Please input your normal drives that you make each day.</CardDescription>
                        </CardHeader>
                        <CardContent className='grid grid-cols-7'>
                            {
                                ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].map((day) => (
                                    <TripListForm name={day} key={day} />
                                ))
                            }
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Monthly Trips</CardTitle>
                            <CardDescription>What are the drives you make at least once a month?</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <TripListForm quantity={true} name="month" key="month" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Annual Trips</CardTitle>
                            <CardDescription>What are the drives you make at least once a year?</CardDescription>
                        </CardHeader>
                        <CardContent>
                                <TripListForm quantity={true} name="year" key="year" />
                        </CardContent>
                    </Card>
                </CardContent>
            </div>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Mileage</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Field>
                        <FieldLabel>MPG</FieldLabel>
                        <Controller
                            name={`mpg`}
                            control={form.control}
                            render={({field, fieldState}) => (
                            <Input
                                {...form.register(`mpg`)}
                                {...field}
                                aria-invalid={fieldState.invalid}
                            />
                            )}
                        />
                        </Field>
                        <Field>
                            <FieldLabel>Cost of Gas:</FieldLabel>
                            <Controller
                            name={`cost`}
                            control={form.control}
                            render={({field, fieldState}) => (
                            <Input
                                {...form.register(`cost`)}
                                {...field}
                                aria-invalid={fieldState.invalid}
                            />
                            )}
                        />
                        </Field>
                        <Field>
                            <FieldLabel>Target Year:</FieldLabel>
                            <Controller
                            name={`targetYear`}
                            control={form.control}
                            render={({field, fieldState}) => (
                            <Input
                                {...form.register(`targetYear`)}
                                {...field}
                                aria-invalid={fieldState.invalid}
                            />
                            )}
                        />
                        </Field>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Expected Costs</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Month</TableHead>
                                    <TableHead className="w-[100px]">Expected Cost</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow key="january">
                                    <TableCell>January</TableCell>
                                    <TableCell>{data.january}</TableCell>
                                </TableRow>
                                <TableRow key="february">
                                    <TableCell>February</TableCell>
                                    <TableCell>{data.february}</TableCell>
                                </TableRow>
                                <TableRow key="march">
                                    <TableCell>March</TableCell>
                                    <TableCell>{data.march}</TableCell>
                                </TableRow>
                                <TableRow key="april">
                                    <TableCell>April</TableCell>
                                    <TableCell>{data.april}</TableCell>
                                </TableRow>
                                <TableRow key="may">
                                    <TableCell>May</TableCell>
                                    <TableCell>{data.may}</TableCell>
                                </TableRow>
                                <TableRow key="june">
                                    <TableCell>June</TableCell>
                                    <TableCell>{data.june}</TableCell>
                                </TableRow>
                                <TableRow key="july">
                                    <TableCell>July</TableCell>
                                    <TableCell>{data.july}</TableCell>
                                </TableRow>
                                <TableRow key="august">
                                    <TableCell>August</TableCell>
                                    <TableCell>{data.august}</TableCell>
                                </TableRow>
                                <TableRow key="september">
                                    <TableCell>September</TableCell>
                                    <TableCell>{data.september}</TableCell>
                                </TableRow>
                                <TableRow key="october">
                                    <TableCell>October</TableCell>
                                    <TableCell>{data.october}</TableCell>
                                </TableRow>
                                <TableRow key="november">
                                    <TableCell>November</TableCell>
                                    <TableCell>{data.november}</TableCell>
                                </TableRow>
                                <TableRow key="december">
                                    <TableCell>December</TableCell>
                                    <TableCell>{data.december}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Button type="submit" form="mileage_form">Calculate</Button>
                    </CardContent>
                </Card>
            </div>
        </Card>
    );
}