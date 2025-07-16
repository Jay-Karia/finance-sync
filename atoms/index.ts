import {Group} from '@/types/group'
import { atomWithStorage } from 'jotai/utils'

export const groupsAtom = atomWithStorage<Group[]>('groups', [])
