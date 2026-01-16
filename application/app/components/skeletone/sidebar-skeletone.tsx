export function SidebarNavSkeleton() {
    return (
      <div className="space-y-2 px-2">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-8 rounded-md bg-gray-500 animate-pulse"
          />
        ))}
      </div>
    )
}

export default SidebarNavSkeleton;
  