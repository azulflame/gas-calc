"use client"

export type Mileage = {
    id: string;
    sunday: Drives[];
    monday: Drives[];
    tuesday: Drives[];
    wednesday: Drives[];
    thursday: Drives[];
    friday: Drives[];
    saturday: Drives[];    month: Drives[];
    year: Drives[];
    mpg: number;
};

type Drives = {
    name: string;
    distance: number;
};

