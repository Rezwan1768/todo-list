import { initializeForm } from "./views/task/task-form";
import { initalizeProject } from "./views/project/initalize-project";
//import {displayAllProject} from "./views/project/display-project.sj";
import { createDefaultProject } from "./models";
import "./styles.css";

createDefaultProject();
initalizeProject();
initializeForm();
