

export interface Task {
    id : number; 
    entitled : string; 
    description : string | null; 
    creationDate : Date; 
    deadLine : Date | null; 
    endDate : Date | null; 
    priority : 'low' | 'medium' | 'high'; 
}