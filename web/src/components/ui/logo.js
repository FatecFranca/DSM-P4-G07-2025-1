import Image from "next/image"
import Link from "next/link"

export const Logo = ({ className = "" }) => {
  return (
    <Link href="/">
      <Image
        src="/logo-petdex.svg"
        alt="PetDex"
        width={0}
        height={0}
        sizes="100vw"
        className={`h-8 w-auto sm:h-10 md:h-12 ${className}`}
        quality={100}
        priority
      />
    </Link>
  )
}