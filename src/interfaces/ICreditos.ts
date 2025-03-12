export interface ICreditos {
  cast: [
    {
      id: number;
      character: string;
      name: string;
      profile_path: string;
    }
  ];
  crew: [
    {
      id: number;
      job: string;
      department: string;
      name: string;
      profile_path: string;
    }
  ];
}
