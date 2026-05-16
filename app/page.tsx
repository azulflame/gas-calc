"use client"

import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup";
import MileageForm from "@/components/form/MileageForm";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";


const mileageEntrySchema = yup.object({
  from: yup.string(),
  to: yup.string(),
  miles: yup.number().positive().required()
});

const mileageEntryQuantitySchema = yup.object({
  from: yup.string(),
  to: yup.string(),
  miles: yup.number().positive().required(),
  amount: yup.number().positive().integer().required()
});

const mileageValidationSchema = yup.object({
  id: yup.string().required(),
  sunday: yup.array().ensure().of(mileageEntrySchema).required(),
  monday: yup.array().ensure().of(mileageEntrySchema).required(),
  tuesday: yup.array().ensure().of(mileageEntrySchema).required(),
  wednesday: yup.array().ensure().of(mileageEntrySchema).required(),
  thursday: yup.array().ensure().of(mileageEntrySchema).required(),
  friday: yup.array().ensure().of(mileageEntrySchema).required(),
  saturday: yup.array().ensure().of(mileageEntrySchema).required(),
  month: yup.array().ensure().of(mileageEntryQuantitySchema).required(),
  year: yup.array().ensure().of(mileageEntryQuantitySchema).required(),
  targetYear: yup.number().positive().integer().required(),
  mpg: yup.number().positive().required(),
  cost: yup.number().positive().required(),
})

export type mileageEntry = {
    from?: string,
    to?: string,
    miles: number
  }

export type mileageEntryQuantity = {
    from?: string,
    to?: string,
    miles: number,
    amount: number
  }

export type mileageSchema = {
  id: string,
  sunday: mileageEntry[];
  monday: mileageEntry[];
  tuesday: mileageEntry[];
  wednesday: mileageEntry[];
  thursday: mileageEntry[];
  friday: mileageEntry[];
  saturday: mileageEntry[];
  month: mileageEntryQuantity[],
  year: mileageEntryQuantity[],
  targetYear: number,
  mpg: number
  cost: number,
}

export type MileageDefaults = {
  january: number,
  february: number,
  march: number,
  april: number,
  may: number,
  june: number,
  august: number,
  september: number,
  october: number,
  november: number,
  december: number
}

export const mileage_defaults = {
        january: 0,
        february: 0,
        march: 0,
        april: 0,
        may: 0,
        june: 0,
        july: 0,
        august: 0,
        september: 0,
        october: 0,
        november: 0,
        december: 0,
    }

export default function Home() {
  const [calculations, setCalculations] = useState(mileage_defaults)

  const doOnSubmit: SubmitHandler<mileageSchema> = (form_data: mileageSchema) => {
    const costs = computeCost(form_data);
    setCalculations(costs)
  }

  const form = useForm<mileageSchema>({
    resolver: yupResolver(mileageValidationSchema),
    defaultValues: {
      sunday: [],
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      month: [],
      year: [],
      id: "local",
      mpg: 1,
      targetYear: 2026,
      cost: 1.00,
    },
  });

  return (
    <FormProvider {...form}>
      <form id="mileage_form" onSubmit={form.handleSubmit(doOnSubmit)} >
        <MileageForm data={calculations}/>
      </form>
    </FormProvider>
  );

  function computeCost(mileage: mileageSchema) {
    const toOutput = {...mileage_defaults};
    
    const days = []
    days.push(mileage.sunday.map(x => x.miles).reduce((prev, curr) => prev+ curr, 0))
    days.push(mileage.monday.map(x => x.miles).reduce((prev, curr) => prev+ curr, 0))
    days.push(mileage.tuesday.map(x => x.miles).reduce((prev, curr) => prev+ curr, 0))
    days.push(mileage.wednesday.map(x => x.miles).reduce((prev, curr) => prev+ curr, 0))
    days.push(mileage.thursday.map(x => x.miles).reduce((prev, curr) => prev+ curr, 0))
    days.push(mileage.friday.map(x => x.miles).reduce((prev, curr) => prev+ curr, 0))
    days.push(mileage.saturday.map(x => x.miles).reduce((prev, curr) => prev+ curr, 0))
    const month = mileage.month.map(x => x.miles * x.amount ).reduce((prev, curr) => prev+curr, 0) + mileage.year.map(x => x.miles * x.amount ).reduce((prev, curr) => prev+curr, 0)/12

    let jan = month;
    for (let i = 1; i <= 31; i++)
    {
      jan += days[new Date(Date.parse(`${mileage.targetYear.toString()}-01-${i.toString()}`)).getUTCDay()]
    }
    toOutput.january = (jan / mileage.mpg) * mileage.cost;

    let feb = month;
    const feb_days = (new Date().getFullYear() % 4 == 0) ? 29 : 28;
    for (let i = 1; i <= feb_days; i++)
    {
      feb += days[new Date(Date.parse(`${mileage.targetYear.toString()}-02-${i.toString()}`)).getUTCDay()]
    }
    toOutput.february = (feb / mileage.mpg) * mileage.cost;

    let mar = month;
    for (let i = 1; i <= 31; i++)
    {
      mar += days[new Date(Date.parse(`${mileage.targetYear.toString()}-03-${i.toString()}`)).getUTCDay()]
    }
    toOutput.march = (mar / mileage.mpg) * mileage.cost;

    let apr = month;
    for (let i = 1; i <= 30; i++)
    {
      apr += days[new Date(Date.parse(`${mileage.targetYear.toString()}-04-${i.toString()}`)).getUTCDay()]
    }
    toOutput.april = (apr / mileage.mpg) * mileage.cost;

    let may = month;
    for (let i = 1; i <= 31; i++)
    {
        may += days[new Date(Date.parse(`${mileage.targetYear.toString()}-05-${i.toString()}`)).getUTCDay()]
    }
    toOutput.may = (may / mileage.mpg) * mileage.cost;

    let jun = month;
    for (let i = 1; i <= 30; i++)
    {
        jun += days[new Date(Date.parse(`${mileage.targetYear.toString()}-06-${i.toString()}`)).getUTCDay()]
    }
    toOutput.june = (jun / mileage.mpg) * mileage.cost;

    let jul = month;
    for (let i = 1; i <= 31; i++)
    {
        jul += days[new Date(Date.parse(`${mileage.targetYear.toString()}-07-${i.toString()}`)).getUTCDay()]
    }
    toOutput.july = (jul / mileage.mpg) * mileage.cost;

    let aug = month;
    for (let i = 1; i <= 31; i++)
    {
        aug += days[new Date(Date.parse(`${mileage.targetYear.toString()}-08-${i.toString()}`)).getUTCDay()]
    }
    toOutput.august = aug / (mileage.mpg) * mileage.cost;

    let sep = month;
    for (let i = 1; i <= 30; i++)
    {
        sep += days[new Date(Date.parse(`${mileage.targetYear.toString()}-09-${i.toString()}`)).getUTCDay()]
    }
    toOutput.september = (sep / mileage.mpg) * mileage.cost;

    let oct = month;
    for (let i = 1; i <= 31; i++)
    {
        oct += days[new Date(Date.parse(`${mileage.targetYear.toString()}-10-${i.toString()}`)).getUTCDay()]
    }
    toOutput.october = (oct / mileage.mpg) * mileage.cost;

    let nov = month;
    for (let i = 1; i <= 30; i++)
    {
        nov += days[new Date(Date.parse(`${mileage.targetYear.toString()}-11-${i.toString()}`)).getUTCDay()]
    }
    toOutput.november = (nov / mileage.mpg) * mileage.cost;

    let dec = month;
    for (let i = 1; i <= 31; i++)
    {
      const day = days[new Date(Date.parse(`${mileage.targetYear.toString()}-12-${i.toString()}`)).getUTCDay()]
        dec += day
    }
    toOutput.december = (dec / mileage.mpg) * mileage.cost;

    return toOutput;
  }
}