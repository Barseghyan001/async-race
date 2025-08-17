import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, Dispatch } from '../store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch = () => useDispatch<Dispatch>();
