"use client";

import { useState } from "react";
import { ConsultantCard } from "@/components/ConsultantCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ConsultantListProps {
  consultants: any[];
}

export function ConsultantList({ consultants }: ConsultantListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");

  // Get unique locations for filter
  const locations = Array.from(new Set(consultants.map((c) => c.location)));

  // Filter consultants based on search term and filters
  const filteredConsultants = consultants.filter((consultant) => {
    const matchesSearch =
      consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultant.expertise.some((skill: string) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesLocation = locationFilter
      ? consultant.location === locationFilter
      : true;

    const matchesExperience = experienceFilter
      ? experienceFilter === "0-3"
        ? consultant.yearsOfExperience < 4
        : experienceFilter === "3-7"
        ? consultant.yearsOfExperience >= 3 && consultant.yearsOfExperience <= 7
        : consultant.yearsOfExperience > 7
      : true;

    return matchesSearch && matchesLocation && matchesExperience;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Label htmlFor="search" className="mb-2 block">
            Search
          </Label>
          <Input
            id="search"
            placeholder="Search by name or expertise..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <Label htmlFor="location" className="mb-2 block">
            Location
          </Label>
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger id="location">
              <SelectValue placeholder="Any location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any location</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-48">
          <Label htmlFor="experience" className="mb-2 block">
            Experience
          </Label>
          <Select value={experienceFilter} onValueChange={setExperienceFilter}>
            <SelectTrigger id="experience">
              <SelectValue placeholder="Any experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any experience</SelectItem>
              <SelectItem value="0-3">0-3 years</SelectItem>
              <SelectItem value="3-7">3-7 years</SelectItem>
              <SelectItem value="7+">7+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <h2 className="text-xl font-semibold">
        {filteredConsultants.length} Consultants Found
      </h2>

      <div className="grid grid-cols-1 gap-6">
        {filteredConsultants.map((consultant) => (
          <ConsultantCard key={consultant.id} consultant={consultant} />
        ))}
      </div>
    </div>
  );
}
