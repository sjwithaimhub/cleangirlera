import { supabase } from './base44Client';

const makeEntity = (table) => ({
  list: async (order, limit) => {
    let query = supabase.from(table).select('*');
    if (order) query = query.order(order.replace('-', ''), { ascending: !order.startsWith('-') });
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },
  create: async (data) => {
    const { data: result, error } = await supabase.from(table).insert(data).select().single();
    if (error) throw error;
    return result;
  },
  update: async (id, data) => {
    const { data: result, error } = await supabase.from(table).update(data).eq('id', id).select().single();
    if (error) throw error;
    return result;
  },
  delete: async (id) => {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) throw error;
  },
});

export const Housemate = makeEntity('housemates');
export const Chore = makeEntity('chores');
export const Leave = makeEntity('leaves');
export const ChoreAssignment = makeEntity('chore_assignments');
export const Nudge = makeEntity('nudges');
export const ChoreCompletion = makeEntity('chore_completions');
export const User = {
  me: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }
};
