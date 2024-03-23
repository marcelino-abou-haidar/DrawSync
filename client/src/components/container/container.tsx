import clsx from 'clsx';
import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}
export const Container = ({ children, className = '' }: ContainerProps) => {
  return <div className={clsx('mx-auto max-w-7xl', className)}>{children}</div>;
};
