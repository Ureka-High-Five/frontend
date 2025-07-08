import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const avatarVariants = cva("relative flex shrink-0 overflow-hidden", {
	variants: {
		size: {
			sm: "w-8 h-8",
			md: "w-10 h-10",
			lg: "w-16 h-16",
		},
		variant: {
			circle: "rounded-full",
			rounded: "rounded-2xl",
			square: "rounded-none",
		},
		status: {
			online: "ring-2 ring-green-500 ring-offset-2 ring-offset-white",
			offline: "opacity-50 grayscale",
		},
	},
	defaultVariants: {
		size: "md",
		variant: "circle",
	},
});

interface AvatarProps
	extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
		VariantProps<typeof avatarVariants> {}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
	({ className, size, variant, status, ...props }, ref) => (
		<AvatarPrimitive.Root
			ref={ref}
			className={cn(avatarVariants({ size, variant, status }), className)}
			{...props}
		/>
	)
);
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef<
	HTMLImageElement,
	React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Image
		ref={ref}
		className={cn("aspect-square h-full w-full object-cover", className)}
		{...props}
	/>
));
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Fallback
		ref={ref}
		className={cn(
			"flex h-full w-full items-center justify-center text-xs bg-muted",
			className
		)}
		{...props}
	/>
));
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
