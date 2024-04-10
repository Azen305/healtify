export interface StatelistsDataRoot {
  success: boolean;
  statusCode: number;
  message: string;
  data: StatelistsData;
}

export interface StatelistsData {
  states: StateListsdt[];
}

export interface StateListsdt {
  id: number;
  state_name: string;
  phone: string;
  click_count: number;
  active: number;
  created_at: string;
  updated_at: string;
}
