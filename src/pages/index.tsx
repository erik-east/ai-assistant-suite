import { type NextPage } from "next";
import { PageHeader } from "@/components/common/page-header/page-header";
import {
  BookOpenIcon,
  ClipboardIcon,
  HeartHandshakeIcon,
  PenToolIcon,
  PlaneIcon,
  SigmaIcon
} from "lucide-react";

const companions = [
  {
    title: 'Wanderlust Companion',
    href: 'wanderlust-companion',
    icon: PlaneIcon,
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
    description: 'Wanderlust Companion is your ultimate travel companion, designed to transform your vacation dreams into unforgettable journeys.'
  },
  {
    title: 'Wordsmith Companion',
    href: 'wordsmith-companion',
    icon: PenToolIcon,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
    description: 'Wordsmith Companion harnesses the power of ChatGPT, an advanced language model, to assist users in generating high-quality essays on various topics.'
  },
  {
    title: 'EZBrief Companion',
    href: 'summarise-companion',
    icon: SigmaIcon,
    iconForeground: 'text-sky-700',
    iconBackground: 'bg-sky-50',
    description: 'EZBrief Companion is a cutting-edge application that employs state-of-the-art natural language processing algorithms to swiftly distill the essence of any text.'
  },
  {
    title: 'Storytime Companion',
    href: 'storytime-companion',
    icon: BookOpenIcon,
    iconForeground: 'text-yellow-700',
    iconBackground: 'bg-yellow-50',
    description: 'Storytime Companion generates personalized bedtime stories for your kids.'
  },
  {
    title: 'Greetify Companion',
    href: 'greetify-companion',
    icon: HeartHandshakeIcon,
    iconForeground: 'text-rose-700',
    iconBackground: 'bg-rose-50',
    description: 'Greetify Companion generates personalized greeting cards with the power of AI.'
  },
  {
    title: 'Cover Letter Companion',
    href: '#',
    icon: ClipboardIcon,
    iconForeground: 'text-indigo-700',
    iconBackground: 'bg-indigo-50',
    description: 'This feature will be available soon.'
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Home: NextPage = () => {
  return (
    <>
      <PageHeader title="Companion Hub" />

      <main className="bg-gray-200 h-screen overflow-auto">
        <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="py-8 md:py-16 bg-gray-200">
              <h1 className="text-4xl md:text-6xl text-center font-bold tracking-tight text-ct-purple-600">
                Companion Hub
              </h1>
            </div>

            <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
              {companions.map((companion, companionIdx) => (
                <div
                  key={companion.title}
                  className={classNames(
                    companionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                    companionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                    companionIdx === companions.length - 2 ? 'sm:rounded-bl-lg' : '',
                    companionIdx === companions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                    'group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
                  )}
                >
                  <div>
                    <span
                      className={classNames(
                        companion.iconBackground,
                        companion.iconForeground,
                        'inline-flex rounded-lg p-3 ring-4 ring-white'
                      )}
                    >
                      <companion.icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                      <a href={companion.href} className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        {companion.title}
                      </a>
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 text-justify">
                      {companion.description}
                    </p>
                  </div>
                  <span
                    className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
                    aria-hidden="true"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                    </svg>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
