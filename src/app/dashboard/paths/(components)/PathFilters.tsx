'use client';

import { HiOutlineCheck } from 'react-icons/hi2';
import { usePathname, useRouter } from 'next/navigation';
import { BsSortDown } from 'react-icons/bs';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PathSorts = ({
  sortBy = 'createdAt',
  filter = 'progress',
}: {
  sortBy: 'createdAt' | 'name';
  filter: 'progress' | 'completed';
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const createQueryString = useCreateQueryString();

  const setSeachParam = (name: string, value: string) => {
    router.push(pathname + '?' + createQueryString(name, value));
  };

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild className='md:hidden'>
          <Button variant='ghost' size='sm' className='px-3 md:hidden'>
            <BsSortDown className='size-4 mr-1.5' /> Filter & Sort
          </Button>
        </DrawerTrigger>
        <DrawerContent className='p-4 text-primary transition-colors'>
          <ul>
            <DrawerClose asChild aria-label='filter button'>
              <li
                onClick={() => setSeachParam('sortBy', 'createdAt')}
                className='py-3 px-2 flex justify-between items-center hover:bg-accent rounded-md'
              >
                Sort by creation
                <HiOutlineCheck
                  className={cn(
                    'size-4',
                    sortBy === 'createdAt' ? 'block' : 'hidden'
                  )}
                />
              </li>
            </DrawerClose>
            <DrawerClose asChild aria-label='filter button'>
              <li
                onClick={() => setSeachParam('sortBy', 'name')}
                className='py-3 px-2 flex justify-between items-center hover:bg-accent rounded-md'
              >
                Sort by name
                <HiOutlineCheck
                  className={cn(
                    'size-4',
                    sortBy === 'name' ? 'block' : 'hidden'
                  )}
                />
              </li>
            </DrawerClose>
          </ul>
          <Separator />
          <ul>
            <DrawerClose asChild aria-label='filter button'>
              <li
                onClick={() => setSeachParam('filter', 'progress')}
                className='py-3 px-2 flex justify-between items-center hover:bg-accent rounded-md'
              >
                In progress
                <HiOutlineCheck
                  className={cn(
                    'size-4',
                    filter === 'progress' ? 'block' : 'hidden'
                  )}
                />
              </li>
            </DrawerClose>
            <DrawerClose asChild aria-label='filter button'>
              <li
                onClick={() => setSeachParam('filter', 'completed')}
                className='py-3 px-2 flex justify-between items-center hover:bg-accent rounded-md'
              >
                Completed
                <HiOutlineCheck
                  className={cn(
                    'size-4',
                    filter === 'completed' ? 'block' : 'hidden'
                  )}
                />
              </li>
            </DrawerClose>
          </ul>
        </DrawerContent>
      </Drawer>
      <Tabs
        className='hidden md:flex'
        onValueChange={val => {
          setSeachParam('filter', val);
        }}
        defaultValue={filter}
      >
        <TabsList>
          <TabsTrigger value='progress'>In Progress</TabsTrigger>
          <TabsTrigger value='completed'>Completed</TabsTrigger>
        </TabsList>
      </Tabs>
      <Select
        value={sortBy}
        onValueChange={val => {
          setSeachParam('sortBy', val);
        }}
      >
        <SelectTrigger
          icon={<BsSortDown />}
          className='w-[240px] bg-background hidden md:ml-3 md:flex'
        >
          <SelectValue placeholder='Sort by' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort by</SelectLabel>
            <SelectItem value='createdAt'>Creation</SelectItem>
            <SelectItem value='name'>Name</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default PathSorts;
