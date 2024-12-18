import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";

export default function Dashboard({ auth, usedFeatures }) {
    console.log(usedFeatures);
    const handlePageChange = (url) => {
        router.visit(url);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Feature
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Credits
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Date
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Additional Data
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usedFeatures.data.map((usedFeature) => (
                                        <tr
                                            key={usedFeature.id}
                                            className="bg-white border-b "
                                        >
                                            <td
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                            >
                                                {usedFeature.feature.name}
                                            </td>
                                            <td
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                            >
                                                {usedFeature.credits}
                                            </td>
                                            <td
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                            >
                                                {usedFeature.created_at}
                                            </td>
                                            <td>
                                                {JSON.stringify(
                                                    usedFeature.data
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {!usedFeatures.data.length && (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                            >
                                                No data
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="flex flex-wrap gap-4 m-4">
                                {usedFeatures.meta.links.map((link, index) => (
                                    <button
                                        key={index}
                                        onClick={() =>
                                            handlePageChange(link.url)
                                        }
                                        disabled={!link.url || link.active}
                                        className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap bg-gray-100 rounded-md"
                                    >
                                        {link.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
