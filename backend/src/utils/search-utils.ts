import {Tunes} from "../models";
import {Filter} from "@loopback/repository";

export const FullSearchFilter: Filter<Tunes> = {
    include: [
        {
            relation: "nations"
        },
        {
            relation: "languages"
        },
        {
            relation: "countries"
        },
        {
            relation: "users"
        },
        {
            relation: "externalReferences",
            scope: {}
        },
        {
            relation: "tunesPersonsRoles",
            scope: {
                include: [
                    {
                        relation: "persons",
                        scope: {}
                    },
                    {
                        relation: "tunePersonRoleTypes"
                    }
                ]
            }
        },
        {
            relation: "tunePlaces",
            scope: {
                include: [
                    {
                        relation: "persons"
                    },
                    {
                        relation: "tunePlaceTypes"
                    },
                    {
                        relation: "parishes"
                    },
                    {
                        relation: "municipalities"
                    },
                    {
                        relation: "villages"
                    }
                ]
            }
        },
        {
            relation: "tunePerformances",
            scope: {
                include: [
                    {
                        relation: "actualPerformanceTypes"
                    },
                    {
                        relation: "traditionalPerformanceTypes"
                    },
                    {
                        relation: "actualActionTypes"
                    },
                    {
                        relation: "traditionalActionTypes"
                    }
                ]
            }
        },
        {
            relation: "tuneTranscriptions",
            scope: {
                include: [
                    {
                        relation: "transcriptionSources"
                    },
                    {
                        relation: "transcriptionsPersonsRoles",
                        scope: {
                            include: [
                                {
                                    relation: "persons"
                                },
                                {
                                    relation: "transcriptionPersonRoleTypes"
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            relation: "tuneSongs",
            scope: {
                include: [
                    {
                        relation: "songGenres"
                    },
                    {
                        relation: "tuneGenres"
                    },
                    {
                        relation: "songTopics"
                    },
                    {
                        relation: "verseForms"
                    }
                ]
            }
        },
        {
            relation: "tuneEncodings",
            scope: {
                include: [
                    {
                        relation: "keySignatures"
                    },
                    {
                        relation: "supportSounds"
                    },
                    {
                        relation: "pitches"
                    },
                    {
                        relation: "measures"
                    },
                    {
                        relation: "rhythmTypes"
                    },
                    {
                        relation: "tuneMelodies",
                        scope: {}
                    }
                ]
            }
        },
        {
            relation: "musicalCharacteristics",
            scope: {
                include: [
                    {
                        relation: "soundRanges"
                    },
                    {
                        relation: "tuneForms"
                    },
                    {
                        relation: "textForms"
                    },
                    {
                        relation: "rhythmTypes"
                    }
                ]
            }
        }
    ]
};

export const deepObjectIncludes = (obj: any, query: string): boolean => {
    const q = query.toLowerCase();

    const visited = new WeakSet();

    const search = (value: any): boolean => {
        if (value === null || value === undefined) return false;
        if (typeof value === "string") return value.toLowerCase().includes(q);
        if (typeof value === "number" || typeof value === "boolean") return false;
        if (typeof value === "object") {
            if (visited.has(value)) return false;
            visited.add(value);

            if (Array.isArray(value)) {
                return value.some(v => search(v));
            }

            return Object.values(value).some(v => search(v));
        }
        return false;
    };

    return search(obj);
}

export const stripRelations = (tune: Tunes): Partial<Tunes> => {
    const json = tune.toJSON() as Partial<Tunes>;
    const {id, tuneStateId, tuneReference, textReference, soundReference, videoReference} = json;
    return {id, tuneStateId, tuneReference, textReference, soundReference, videoReference};
};
