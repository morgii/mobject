function generateJson(mobName, isSpawnable, isSummonable, breedItem, babyScale, lootTableDirectory, entityFamily) {
            return generatedJson = `
{
    "format_version": "1.16.0",
    "minecraft:entity": {
        "description": {
            "identifier": "${mobName}",
            "is_spawnable": ${isSpawnable},
            "is_summonable": ${isSummonable},
            "is_experimental": false
        },
        "component_groups": {
            "${mobName}_baby": {
                "minecraft:is_baby": {},
                "minecraft:scale": {
                    "value": ${babyScale}
                },
                "minecraft:ageable": {
                    "duration": 1200,
                    "feed_items": "${breedItem}",
                    "grow_up": {
                        "event": "minecraft:ageable_grow_up",
                        "target": "self"
                    }
                },
                "minecraft:behavior.follow_parent": {
                    "priority": 6,
                    "speed_multiplier": 1.1
                }
            },
            "${mobName}_adult": {
                "minecraft:experience_reward": {
                    "on_bred": "Math.Random(1,7)",
                    "on_death": "query.last_hit_by_player ? Math.Random(1,3) : 0"
                },
                "minecraft:loot": {
                    "table": "${lootTableDirectory}"
                },
                "minecraft:behavior.breed": {
                    "priority": 3,
                    "speed_multiplier": 1
                },
                "minecraft:breedable": {
                    "require_tame": false,
                    "breed_items": "${breedItem}",
                    "breeds_with": {
                        "mate_type": "${mobName}",
                        "baby_type": "${mobName}",
                        "breed_event": {
                            "event": "minecraft:entity_born",
                            "target": "baby"
                        }
                    }
                }
            }
        },
        "components": {
            "minecraft:type_family": {
                "family": [
                    "${entityFamily}",
                    "mob"
                ]
            },
            "minecraft:breathable": {
                "total_supply": 15,
                "suffocate_time": 0
            },
            "minecraft:navigation.walk": {
                "can_path_over_water": true,
                "avoid_water": true,
                "avoid_damage_blocks": true
            },
            "minecraft:movement.basic": {},
            "minecraft:jump.static": {},
            "minecraft:can_climb": {},
            "minecraft:collision_box": {
                "width": 0.9,
                "height": 1.3
            },
            "minecraft:nameable": {},
            "minecraft:health": {
                "value": 10,
                "max": 10
            },
            "minecraft:hurt_on_condition": {
                "damage_conditions": [
                    {
                        "filters": {
                            "test": "in_lava",
                            "subject": "self",
                            "operator": "==",
                            "value": true
                        },
                        "cause": "lava",
                        "damage_per_tick": 4
                    }
                ]
            },
            "minecraft:movement": {
                "value": 0.25
            },
            "minecraft:despawn": {
                "despawn_from_distance": {}
            },
            "minecraft:behavior.float": {
                "priority": 0
            },
            "minecraft:behavior.panic": {
                "priority": 1,
                "speed_multiplier": 1.25
            },
            "minecraft:behavior.mount_pathing": {
                "priority": 2,
                "speed_multiplier": 1.5,
                "target_dist": 0,
                "track_target": true
            },
            "minecraft:behavior.breed": {
                "priority": 3,
                "speed_multiplier": 1
            },
            "minecraft:behavior.tempt": {
                "priority": 4,
                "speed_multiplier": 1.25,
                "items": [
                    "${breedItem}"
                ]
            },
            "minecraft:behavior.follow_parent": {
                "priority": 5,
                "speed_multiplier": 1.1
            },
            "minecraft:behavior.random_stroll": {
                "priority": 6,
                "speed_multiplier": 0.8
            },
            "minecraft:behavior.look_at_player": {
                "priority": 7,
                "look_distance": 6,
                "probability": 0.02
            },
            "minecraft:behavior.random_look_around": {
                "priority": 9
            },
            "minecraft:leashable": {
                "soft_distance": 4,
                "hard_distance": 6,
                "max_distance": 10
            },
            "minecraft:balloonable": {},
            "minecraft:rideable": {
                "seat_count": 1,
                "family_types": [
                    "zombie"
                ],
                "seats": {
                    "position": [
                        0,
                        1.105,
                        0
                    ]
                }
            },
            "minecraft:physics": {},
            "minecraft:pushable": {
                "is_pushable": true,
                "is_pushable_by_piston": true
            },
            "minecraft:conditional_bandwidth_optimization": {}
        },
        "events": {
            "minecraft:entity_spawned": {
                "randomize": [
                    {
                        "weight": 95,
                        "trigger": "minecraft:spawn_adult"
                    },
                    {
                        "weight": 5,
                        "add": {
                            "component_groups": [
                                "${mobName}_baby"
                            ]
                        }
                    }
                ]
            },
            "minecraft:entity_born": {
                "add": {
                    "component_groups": [
                        "${mobName}_baby"
                    ]
                }
            },
            "minecraft:entity_transformed": {
                "remove": {},
                "add": {
                    "component_groups": [
                        "${mobName}_adult"
                    ]
                }
            },
            "minecraft:ageable_grow_up": {
                "remove": {
                    "component_groups": [
                        "${mobName}_baby"
                    ]
                },
                "add": {
                    "component_groups": [
                        "${mobName}_adult"
                    ]
                }
            },
            "minecraft:spawn_adult": {
                "add": {
                    "component_groups": [
                        "${mobName}_adult"
                    ]
                }
            }
        }
    }
}`;
        }

        function submit() {
            const mobName = document.getElementById('mobName').value;
            const isSpawnable = document.getElementById("isSpawnable").checked;
            const isSummonable = document.getElementById("isSummonable").checked;
            const breedItem = document.getElementById("breedItem").value;
            const babyScale = document.getElementById("babyScale").value;
            const lootTableDirectory = document.getElementById("lootTableDirectory").value;
            const entityFamily = document.getElementById("entityFamily").value;

            const rawJson = generateJson(mobName, isSpawnable, isSummonable, breedItem, babyScale, lootTableDirectory, entityFamily);
            const parsedJson = JSON.parse(rawJson);
            document.getElementById('output').innerText = JSON.stringify(parsedJson, null, 3);
        }