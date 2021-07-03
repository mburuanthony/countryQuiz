import { createContext } from "react";

import adventureImg from "./Assets/Images/undraw_adventure_4hum 1.svg";
import winnerImg from "./Assets/Images/undraw_winners_ao2o 2.svg";

const avatars = { adventure: adventureImg, winner: winnerImg };
export const avatarContext = createContext(avatars);
