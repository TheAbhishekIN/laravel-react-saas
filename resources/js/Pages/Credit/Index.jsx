import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CreditPricingCards from "@/Components/CreditPricingCards";

export default function Index({ auth, packages, features, success, error }) {
    const availableCredits = auth.user.available_credits;
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Your Credits
                </h2>
            }
        >
            <Head title="Your Credits" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {success && (
                        <div className="mb-3 py-3 px-5 rounded text-white bg-green-600 text-xl">
                            {success}
                        </div>
                    )}
                    {error && (
                        <div className="mb-3 py-3 px-5 rounded text-white bg-red-600 text-xl">
                            {error}
                        </div>
                    )}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg relative">
                        <div className="flex felx-col gap-3 items-center p-4">
                            <img
                                src="/images/credit.png"
                                alt="credit"
                                className="w-[100px]"
                            />
                            <h3 className="text-gray-800 text-2xl">
                                You have {availableCredits} credits
                            </h3>
                        </div>
                    </div>
                    <CreditPricingCards
                        packages={packages.data}
                        features={features.data}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
